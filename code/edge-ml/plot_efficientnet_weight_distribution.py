# Make sure you have done "pip install efficientnet_pytorch"
from efficientnet_pytorch import EfficientNet
import numpy as np
import matplotlib.pyplot as plt

model = EfficientNet.from_pretrained('efficientnet-b0')

all_parameters = []
for para in list(model.parameters()):
  all_parameters.append(para.flatten().cpu().detach().numpy())

parameter_vec = np.concatenate(all_parameters)

plt.figure()
plt.subplot(2, 1, 1)
plt.hist(parameter_vec, bins=100)
plt.xlabel("Weight value")
plt.ylabel("Count")

plt.subplot(2, 1, 2)
plt.hist(parameter_vec, bins=100, log=True)
plt.xlabel("Weight value")
plt.ylabel("Count in log scale")
plt.show()