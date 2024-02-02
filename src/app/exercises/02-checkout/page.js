'use client';
import React from 'react';

import DATA from './data';
import reducer from './reducer';
import StoreItem from './StoreItem';
import CheckoutFlow from './CheckoutFlow';
import './styles.css';

function CheckoutExercise() {
  const [items, dispatch] = React.useReducer(reducer, []);
  const [isLoading, setIsLoading] = React.useState(true);

  React.useEffect(() => {
    const savedItems =
      typeof window !== 'undefined' && window.localStorage
        ? JSON.parse(localStorage.getItem('cart-items'))
        : [];
    if (savedItems && savedItems.length > 0) {
      dispatch({
        type: 'save-items',
        payload: savedItems,
      });
    }
    setIsLoading(false);
  }, []);

  return (
    <>
      <h1>Neighborhood Shop</h1>

      <main>
        <div className='items'>
          {DATA.map((item) => (
            <StoreItem
              key={item.id}
              item={item}
              handleAddToCart={(item) => {
                dispatch({
                  type: 'add-item',
                  item,
                });
              }}
            />
          ))}
        </div>

        <CheckoutFlow
          items={items}
          taxRate={0.15}
          isLoading={isLoading}
          handleDeleteItem={(item) =>
            dispatch({
              type: 'delete-item',
              item,
            })
          }
        />
      </main>
    </>
  );
}

export default CheckoutExercise;
