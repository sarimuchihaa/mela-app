import React, {useContext, useEffect} from 'react';
import { Check, Crown } from "lucide-react"
import { BusinessBaseURL } from '../../../APIS/APIS';
import { UserContext } from '../../../ContextApi/UserContext';


export default function Subscriptions() {
  const subscriptions = [
    { name: 'Basic', price: 9.99, period: 'month', features: ['Lorem ipsum dolor sit amet', 'Lorem ipsum dolor sit amet', 'Lorem ipsum dolor sit amet'] },
    { name: 'Standard', price: 99.99, period: '1 year', features: ['Lorem ipsum dolor sit amet', 'Lorem ipsum dolor sit amet', 'Lorem ipsum dolor sit amet'] },
    { name: 'Premium', price: 199.99, period: '2 years', features: ['Lorem ipsum dolor sit amet', 'Lorem ipsum dolor sit amet', 'Lorem ipsum dolor sit amet'] },
  ];
  const { businessId } = useContext(UserContext);

// GET isSubscribe false as default.
  useEffect(() => {
    // useEffect to fetch user data from API.
    const fetchData = async () => {
      try {
        const response = await fetch(
          `${BusinessBaseURL}/getBusiness?businessId=${businessId}`
        );

        // Check if response is successful.
        if (!response.ok) {
          throw new Error(`HTTP error! Status: ${response.status}`);
        }

        // Parse JSON response.
        const data = await response.json();

        // Extract isSubscribe value from response.
        const isSubscribe = data.user.isSubscribe;

        // Store isSubscribe value in local storage.
        localStorage.setItem('isSubscribe', JSON.stringify(isSubscribe));
        console.log('isSubscribe value stored in local storage:', isSubscribe);

      } catch (error) {
        console.error('Error fetching user data:', error);
      }
    };

    // Call fetchData function to fetch data.
    fetchData();
  }, []);



  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-5xl font-bold text-center text-custom-blue mb-4">Subscriptions</h1>
      <p className="text-center text-gray-600 mt-12">
        Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aenean id urna et lorem pulvinar finibus nec et justo.
      </p>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {subscriptions.map((sub, index) => (
          <div key={index} className="w-full bg-white rounded-lg shadow-md overflow-hidden">
            <div className="p-6">
              <h2 className="flex items-center justify-center text-2xl font-bold mb-4">
                <Crown className="w-12 h-12 text-yellow-400 mr-2" />
                <span className='text-4xl'>{sub.name}</span>
              </h2>
              <div className="text-center mb-6">
                <span className="text-3xl font-bold">${sub.price}</span>
                <span className="text-gray-500">/{sub.period}</span>
              </div>
              <ul className="space-y-3 mb-6">
                {sub.features.map((feature, featureIndex) => (
                  <li key={featureIndex} className="flex items-center">
                    <Check className="w-5 h-5 text-green-500 mr-2 flex-shrink-0" />
                    <span className="text-gray-600">{feature}</span>
                  </li>
                ))}
              </ul>
            </div>
            <div className="px-6 pb-6">
              <button className="w-full bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded transition duration-300">
                Buy now
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}