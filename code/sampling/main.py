import numpy as np
import matplotlib.pyplot as plt
import torch
import argparse
import random

MIX_RATIO = torch.Tensor([0.15, 0.7, 0.15])
MEAN_VEC = torch.Tensor([[0.0, 0.0], [8.0, 8.0], [8.0, 0.0]])
VAR_VEC = torch.Tensor([[1.0, 4.0], [1.0, 1.0], [4.0, 1.0]])


def eval_gaussian(x, mean, var):
    """Evaluate a Gaussian distribution."""
    coeff = 1.0 / (2.0 * np.pi * torch.sqrt(torch.prod(var)))
    exp_value = torch.exp(-0.5 * torch.sum(torch.pow(x - mean, 2) / var))
    return coeff * exp_value


def mixture_of_gauss(x: torch.Tensor):
    prob = torch.tensor(0.0)
    for idx in range(len(MIX_RATIO)):
        prob += MIX_RATIO[idx] * eval_gaussian(x, MEAN_VEC[idx], VAR_VEC[idx])

    return prob


def grad_mixture_of_gauss(x: torch.Tensor):
    x.requires_grad = True
    y = torch.log(mixture_of_gauss(x))
    g = torch.autograd.grad(y, x, create_graph=False, retain_graph=False)
    return g[0]


def metropolis_hastings(steps=10000):
    # Use Gaussian as proposal distribution
    samples = torch.zeros((steps, 2))
    x_current = torch.Tensor([0, 0])

    i = 0
    while i < steps:
        x_proposal = x_current + torch.randn(2)
        p_current = mixture_of_gauss(x_current)
        p_proposal = mixture_of_gauss(x_proposal)

        # Acceptance criteria
        if p_proposal / p_current > np.random.rand():
            x_current = x_proposal
            samples[i] = x_current
            i += 1

    return samples


def hamiltonian_mc(steps, step_size, leapfrog_steps):
    samples = torch.zeros((steps, 2))
    current_q = torch.randn(2)
    i = 0
    while i < steps:
        q = current_q.clone()
        p = torch.randn(2)
        current_p = p.clone()

        # Leapfrog integration
        p -= step_size * grad_mixture_of_gauss(q.clone()) / 2
        for _ in range(leapfrog_steps):
            q += step_size * p
            p -= step_size * grad_mixture_of_gauss(q.clone())

        # Metropolis acceptance
        current_U = -torch.log(mixture_of_gauss(current_q))
        current_K = torch.sum(current_p**2) / 2
        proposed_U = -torch.log(mixture_of_gauss(q))
        proposed_K = torch.sum(p**2) / 2

        if np.random.rand() < torch.exp(current_U - proposed_U + current_K - proposed_K):
            current_q = q
            samples[i] = current_q
            i += 1

    return samples


def langevin_dynamics(steps, noise_scale):
    samples = torch.zeros((steps, 2))
    current_x = torch.randn(2, requires_grad=True)

    for i in range(steps):
        current_x.requires_grad_(True)
        p_x = torch.log(mixture_of_gauss(current_x))
        p_x.backward()

        with torch.no_grad():
            # Langevin dynamics step
            current_x = current_x + noise_scale * current_x.grad + np.sqrt(2 * noise_scale) * torch.randn(2)

        samples[i] = current_x

    return samples.detach().numpy()


if __name__ == '__main__':
    seed = 42
    random.seed(seed)
    torch.manual_seed(seed)
    np.random.seed(seed)

    parser = argparse.ArgumentParser()
    parser.add_argument('--steps', type=int, default=10000)
    parser.add_argument('--sampler', type=str, default='mh', choices=['mh', 'hmc', 'langevin'])
    args = parser.parse_args()

    if args.sampler == 'mh':
        samples = metropolis_hastings()
    elif args.sampler == 'hmc':
        step_size = 0.25
        samples = hamiltonian_mc(args.steps, step_size, int(1/step_size))
    elif args.sampler == 'langevin':
        noise_scale = 0.25
        samples = langevin_dynamics(args.steps, noise_scale)
    
    samples = samples[int(0.15*args.steps):,:]
    # Plotting the samples
    plt.figure(figsize=(8, 6))
    plt.scatter(samples[:, 0], samples[:, 1], alpha=0.2)
    plt.title(f'Samples from a 2D Mixture of Gaussian Using {args.sampler}')
    plt.xlabel('X-axis')
    plt.ylabel('Y-axis')
    plt.grid(True)
    plt.show()
