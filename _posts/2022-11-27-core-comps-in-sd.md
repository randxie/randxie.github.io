---
layout: post
title: "Core Components inside Stable Diffusion Model"
tags:
- Stable Diffusion
- AIGC
thumbnail_path: "blog/general/aigc_cat.png"
add_to_english_list: true
---

Back in Oct 2022, Robinhood hosted its 6th internal hackathon. I formed a team and participated in the hackathon, which was a super fun experience. In the hackathon, my team figured out a way to batch generated good-looking NFTs and deployed them to Ethereum Goerli testnet. As Robinhood is a cat company, we genertaed a bunch of cat related arts, e.g.

{% include figure.html path="blog/general/aigc_cat.png" alt="a_cat_wearing_jacket_and_sunglasses__concept_by_James_Gilleard__by_Victo_Ngai__Behance_contest_winner__toon__Official_art__sharp__vivid__Dramatic__greeble__volumetric_lighting" %}

Due to this experience, I would like to learn more about stable diffusion and decided to write a blog to describe the core components inside Stable diffusion. This blog is based on the paper ["High-Resolution Image Synthesis with Latent Diffusion Models"](https://arxiv.org/pdf/2112.10752.pdf).

### Overall Architecture

There are 2 major components inside Stable Diffusion.

- An encoder/decoder to transform between pixel space to latent space.
- A diffusion model that keeps adding noise to the original image, then learned to denoise the noisy version step-by-step.

{% include figure.html path="blog/general/stable-diffusion-architecture.png" alt="stable_diffusion_architecture" %}

(1) Encoder / Decoder

The goal of encoder is to transform raw images into latent representation, at the same time, downsize the images by a certain factor. The decoder, on the contrary, is used to convert the latent representation back to raw images. The paper suggests using latency space is more suitable for likelyhood based generative models as (i) it filters out high frequency details and keeps the semantics part, (ii) Train in a lower dimensional space is more computationally efficient.

(2) Diffusion Model

There are many good artciles discussing diffusion models, e.g. [Lilian Weng's post](https://lilianweng.github.io/posts/2021-07-11-diffusion-models/). For stable diffusion, it uses [DDPM - Denoising Diffusion Probablistic Models](https://arxiv.org/pdf/2006.11239.pdf) and DDIM sampler (in stable diffusion V2, DPM solver is used):

{% include figure.html path="blog/general/ddpm.png" %}

The diffusion model contains a forward process that keeps adding Gaussian noise to the latent representations, and a reverse process to sample from $q(x_{t-1} \| x_t)$ that can gradually reconstruct the sample from noise. A time-conditioned U-Net is used in the denoising reverse process, as suggested in the architecture diagram. 

To incorporate additional information that provides the image structure, the U-Net is augmented with cross attention mechanism to incorporate informations like text, semantic map. The cross attention is an effective way to pass information from another sequence into another attention layer:

{% include figure.html path="blog/general/cross-attention.png" alt="cross attention" %}

By combining these two components, we are able to generate high quality images from a prompt.