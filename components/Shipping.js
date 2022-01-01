import { useEffect } from 'react'
import { RadioGroup } from '@headlessui/react'
import { useCart } from '../hooks/useCart'

export default function Shipping({ data }) {

  const { delivery, handleDelivery } = useCart()

  const deliveries = data.deliveries.data

  function handleDelivery2(value) {
    handleDelivery(deliveries.find(({ id }) => id === value))
  }

  if (!deliveries) {
    return 'Sorry, no shipping methods available.'
  }

  return (
    <div className="w-full space-y-4">
      <h2>Shipping</h2>
      <div className="w-full max-w-md mx-auto">
        <RadioGroup value={delivery.id} onChange={handleDelivery2}>
          <RadioGroup.Label className="sr-only">Server size</RadioGroup.Label>
          <div className="space-y-2">
            {deliveries.map((method) => (
              <RadioGroup.Option
                key={method.id}
                value={method.id}
                className={({ active, checked }) =>
                  `${active
                    ? 'ring-2 ring-offset-2 ring-offset-sky-300 ring-white ring-opacity-60'
                    : ''
                  }
                  ${checked ? 'bg-blue-400 text-white' : 'bg-white'
                  }
                  transition-all relative rounded-lg shadow-md px-5 py-4 cursor-pointer flex focus:outline-none`
                }
              >
                {({ active, checked }) => (
                  <>
                    <div className="flex items-center justify-between w-full">
                      <div className="flex items-center">
                        <div>
                          <RadioGroup.Label
                            as="p"
                            className={`font-medium  ${checked ? 'text-white' : 'text-gray-900'
                              }`}
                          >
                            {method.attributes.name}
                          </RadioGroup.Label>
                          <RadioGroup.Description
                            as="span"
                            className={`inline text-sm ${checked ? 'text-sky-100' : 'text-blue-500'
                              }`}
                          >
                            <span>{method.attributes.cost}</span>
                          </RadioGroup.Description>
                        </div>
                      </div>
                      {checked && (
                        <div className="flex-shrink-0 text-white">
                          <CheckIcon className="w-6 h-6" />
                        </div>
                      )}
                    </div>
                  </>
                )}
              </RadioGroup.Option>
            ))}
          </div>
        </RadioGroup>
      </div>
    </div>
  )
}

function CheckIcon(props) {
  return (
    <svg viewBox="0 0 24 24" fill="none" {...props}>
      <circle cx={12} cy={12} r={12} fill="#fff" opacity="0.2" />
      <path
        d="M7 13l3 3 7-7"
        stroke="#fff"
        strokeWidth={1.5}
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  )
}


