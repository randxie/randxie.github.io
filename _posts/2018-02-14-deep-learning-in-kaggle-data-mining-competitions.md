---
layout: post
title: "[Draft] Deep learning in data mining Kaggle competitions"
tags:
- Kaggle
- Data Science
- Deep Learning
thumbnail_path: "blog/dl-kaggle-competitions/neural-network.jpg"
---

In the recent years, deep neural networks have been a standard tool for computation vision competitions. However, for traditional data mining competitions
(tabular data or time series), the dominant workflow is still designing features based on domain knowledge, training machine learning models 
(mostly gradient boosting decision tree (GBDT) and linear models including logistic regression, linear regression and ARMA, then finally stacking multiple models. 

If you ask me 6 months ago how to play a Kaggle competition, you probably get the above answer. It is not the reason why I write this article. 
Very recently, I notices some top Kagglers apply (deep) neural network to win data mining competitions. Although there have been many attempts 
applying deep learning to data mining problems, it is still very difficult to tune a neural network to beat the current workflow, especially in a highly competitive environment. 
In this article, I would love to share three successful attempts in purely applying neural network to win a gold medal in Kaggle competitions 
(2 of them won 1st place in the competition).