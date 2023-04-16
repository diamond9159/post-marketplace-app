import { useState } from 'react';
import axios from 'axios';

export default function Home() {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [price, setPrice] = useState('');
  const [image, setImage] = useState('');
  const [city, setCity] = useState('');
  const [state, setState] = useState('');
  const [facebookId, setFacebookId] = useState('');

  const handleSubmit = async (event) => {
    event.preventDefault();

    try {
      // Create a new post in Facebook Marketplace using the backend API
      const response = await axios.post(
        '/api/facebook/marketplace',
        {
          title,
          description,
          price,
          image,
          city,
          state,
        }
      );

      // Update the Facebook ID state with the ID of the created item
      setFacebookId(response.data.id);
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div className="max-w-lg mx-auto mt-[50px]">
      <h1 className="text-2xl font-bold mb-4">Create a New Product</h1>
      <form onSubmit={handleSubmit}>
        <div className="mb-4">
          <label htmlFor="title" className="block font-medium mb-2">
            Title
          </label>
          <input
            id="title"
            type="text"
            className="form-input"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
          />
        </div>
        <div className="mb-4">
          <label htmlFor="description" className="block font-medium mb-2">
            Description
          </label>
          <textarea
            id="description"
            className="form-textarea"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
          ></textarea>
        </div>
        <div className="mb-4">
          <label htmlFor="price" className="block font-medium mb-2">
            Price
          </label>
          <input
            id="price"
            type="text"
            className="form-input"
            value={price}
            onChange={(e) => setPrice(e.target.value)}
          />
        </div>
        <div className="mb-4">
          <label htmlFor="image" className="block font-medium mb-2">
            Image URL
          </label>
          <input
            id="image"
            type="text"
            className="form-input"
            value={image}
            onChange={(e) => setImage(e.target.value)}
          />
        </div>
        <div className="mb-4">
          <label htmlFor="city" className="block font-medium mb-2">
            City
          </label>
          <input
            id="city"
            type="text"
            className="form-input"
            value={city}
            onChange={(e) => setCity(e.target.value)}
          />
        </div>
        <div className="mb-4">
          <label htmlFor="state" className="block font-medium mb-2">
            State
          </label>
          <input
            id="state"
            type="text"
            className="form-input"
            value={state}
            onChange={(e) => setState(e.target.value)}
          />
        </div>
        <button
          type="submit"
          className="bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-700"
        >
          Create Post
        </button>
      </form>
      {facebookId && (
        <p className="mt-4">
          Your post has been created! View it on Facebook Marketplace{' '}
          <a
            href={`https://www.facebook.com/marketplace/item/${facebookId}`}
            target="_blank"
            rel="noopener noreferrer"
          >
            here
          </a>
          .
        </p>
      )}
    </div>
  );
}