```javascript
// bug.js
import React from 'react';
import { Image } from 'expo-image';

const MyComponent = () => {
  const imageUri = 'invalid-image-uri'; // Example of an invalid URI

  return (
    <Image source={{ uri: imageUri }} style={{ width: 200, height: 200 }} />
  );
};

export default MyComponent;

// bugSolution.js
import React, { useState, useEffect } from 'react';
import { Image, ActivityIndicator, View } from 'expo-image';

const MyComponent = () => {
  const imageUri = 'https://example.com/valid-image.jpg'; // Replace with a valid URI
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    Image.prefetch(imageUri)
    .then(() => setIsLoading(false))
    .catch(e => {
      setError(e);
      setIsLoading(false);
    });
  }, [imageUri]);

  if (isLoading) {
    return <ActivityIndicator size="large" color="#0000ff" />
  }

  if (error) {
    return <View>Error loading image: {error.message}</View> 
  }

  return (
    <Image source={{ uri: imageUri }} style={{ width: 200, height: 200 }} />
  );
};

export default MyComponent;
```