---
layout: post
title: "Deep learning in Kaggle's tabular data competitions"
tags:
- Kaggle
- Data Science
- Deep Learning
thumbnail_path: "blog/dl-kaggle-competitions/neural-network.jpg"
add_to_english_list: true
---

In the recent years, deep neural networks have been standard tools for computation vision competitions. However, for traditional data mining competitions
(tabular data or time series), the dominant workflow is still designing features based on domain knowledge, training machine learning models 
(mostly gradient boosting decision tree (GBDT) and linear models including logistic regression, linear regression and ARMA), then finally stacking multiple models. 

{% include figure.html path="blog/dl-kaggle-competitions/machine-learning-vs-deep-learning.png" alt="MLvsDL" %}

<br />
If you asked me 6 months ago how to play a Kaggle competition, you probably get the above answer. It is not the reason why I write this article. 
Very recently, I notices some top Kagglers apply (deep) neural network to win data mining competitions. Although there have been many attempts 
applying deep learning to data mining problems, it is still very difficult to tune a neural network to beat the current winning workflow, especially in such a highly competitive environment. 

{% include figure.html path="blog/dl-kaggle-competitions/kaggle-page.png" alt="Kaggle" %}

<br />
In this article, I would love to share three successful attempts in applying neural network to win a gold medal in Kaggle competitions 
(2 of them actually won 1st place in the competition). They are <a href="https://www.kaggle.com/c/porto-seguro-safe-driver-prediction/discussion/44629" target="_blank">denoising auto-encoder</a> in Porto Seguro's safe driver prediction, <a href="https://www.kaggle.com/c/mercari-price-suggestion-challenge/discussion/50256" target="_blank">sparse multi-layer perceptron (MLP)</a> in Mericari price 
competition and <a href="https://github.com/sjvasquez/web-traffic-forecasting" target="_blank"> sjv's wavenet-like neural network solution</a> to web traffic time series forecasting competitions. It is worth mentioning that another <a href="https://arxiv.org/abs/1803.04037" target="_blank"> wavenet-like time series neural network </a> used by team "SoLucky" wins 2nd place in <a href="https://www.kaggle.com/c/favorita-grocery-sales-forecasting/leaderboard" target="_blank"> Corporacion Favorita Grocery Sales Forecasting competition </a>.

<br />
### Denoise Auto-Encoder (DAE)
---
My first impression of DAE comes paper "Stacked Denoising Autoencoders_ Learning Useful Representations in a Deep Network with a Local Denoising Criterion". Instead of learning a compact representation of the original data, DAE adds noise to the original data and trains a network that is capable of recovering original data. With DAE, the hidden layer could have a dimension larger than the original data. Mathematically, we try to train a network that performs 
$ f(x+\epsilon) = x $

One challenge on applying DAE to tabular data is the noise creation process, especially the existence of categorical variables. In the original post, the winner Michael Jahrer (MJ) presented a method called "swap noise" that randomly swap a small portion of columns between two samples to create the noisy samples used for training. Here is my implementation of swap noise for your reference.

```python
def add_swap_noise(cur_data, all_data, noise_level=0.07):
  """
  Add swap noise to current data
  :param cur_data: Current batch of data
  :param all_data: The whole data set
  :param noise_level: percentage of columns being swapped
  :return: data with swap noise added
  """
  batch_size = cur_data.shape[0]
  num_samples = all_data.shape[0]
  num_features = cur_data.shape[1]
  random_row = np.random.randint(0, num_samples, size=batch_size)
  for i in range(batch_size):
    random_swap = np.random.rand(num_features) < noise_level
    cur_data[i, random_swap] = all_data[random_row[i], random_swap]
  return cur_data
```

The rest of MJ's solution is quite standard. The hidden layers in DAE are used as features to training a MLP classifier that used to classifier if a driver is safe driver or not.

<br />
### Sparse Multilayer Perceptron (MLP)

It's nothing but a multilayer perceptron with sparse input. I also participate in the Mercari price competition and our team uses ~2000 lines of code to do feature engineering and optimize the speed to fit in 1 hr training time constraints. But the sparse MLP only uses <a href="https://www.kaggle.com/lopuhin/mercari-golf-0-3875-cv-in-75-loc-1900-s" target="_blank">83 lines of code</a> and win the 1st place!!


<br />
### Wavenet-like Time Series Network

sjv is my favorite Kaggler because he always bring inspiring solutions. I believe he is the first one who uses wavenet for time series forecasting. For more technical details, see <a href="https://github.com/sjvasquez/web-traffic-forecasting" target="_blank"> sjv's github repo </a> 


