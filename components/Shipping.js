import { useState } from 'react'
import { RadioGroup } from '@headlessui/react'

const methods = [
  {
    name: 'PickUp',
    desc: 'Delivery to PickUp collection point',
  },
  {
    name: 'Delivery',
    desc: 'Special courier to your home',
  }
]

export default function Shipping() {
  const [selected, setSelected] = useState(methods[0])

  return (
    <div className="w-full">
      <div className="w-full max-w-md mx-auto">
        <RadioGroup value={selected} onChange={setSelected}>
          <RadioGroup.Label className="sr-only">Server size</RadioGroup.Label>
          <div className="space-y-2">
            {methods.map((method) => (
              <RadioGroup.Option
                key={method.name}
                value={method}
                className={({ active, checked }) =>
                  `${
                    active
                      ? 'ring-2 ring-offset-2 ring-offset-sky-300 ring-white ring-opacity-60'
                      : ''
                  }
                  ${
                    checked ? 'bg-blue-400 text-white' : 'bg-white'
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
                            className={`font-medium  ${
                              checked ? 'text-white' : 'text-gray-900'
                            }`}
                          >
                            {method.name}
                          </RadioGroup.Label>
                          <RadioGroup.Description
                            as="span"
                            className={`inline text-sm ${
                              checked ? 'text-sky-100' : 'text-blue-500'
                            }`}
                          >
                            <span>{method.desc}</span>
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
