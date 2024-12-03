import { useLoader } from '@react-three/fiber'
import { OBJLoader } from 'three/examples/jsm/loaders/OBJLoader'
import { useBox } from '@react-three/cannon'
import { useState } from 'react'
import { Html } from '@react-three/drei'

interface InteriorProps {
  expenses: { tv: number; groceries: number; utilities: number }
  updateExpense: (type: 'tv' | 'groceries' | 'utilities', amount: number) => void
}

export default function Interior({ expenses, updateExpense }: InteriorProps) {
  const obj = useLoader(OBJLoader, 'https://raw.githubusercontent.com/Iltx-xtlI/3D-Assets-for-Finance-App/8a61d23e28cc284e3763c6d7086dad1cb16f69b5/indoor_house_floor_pl_1126201829_refine.obj')
  const [showExpense, setShowExpense] = useState<'tv' | 'groceries' | 'utilities' | null>(null)

  const [tvRef] = useBox(() => ({ 
    args: [1, 1, 1], 
    position: [-3, 0.5, -1],
    type: "Static"
  }))
  
  const [fridgeRef] = useBox(() => ({ 
    args: [1, 1, 1], 
    position: [3, 0.5, -1],
    type: "Static"
  }))
  
  const [bedRef] = useBox(() => ({ 
    args: [1, 1, 1], 
    position: [0, 0.5, 3],
    type: "Static"
  }))

  const getBillDetails = (type: 'tv' | 'groceries' | 'utilities') => {
    switch (type) {
      case 'tv':
        return {
          title: 'Streaming Subscriptions',
          amount: expenses.tv,
          color: 'blue'
        }
      case 'groceries':
        return {
          title: 'Grocery Expenses',
          amount: expenses.groceries,
          color: 'green'
        }
      case 'utilities':
        return {
          title: 'Utility Bills',
          amount: expenses.utilities,
          color: 'red'
        }
    }
  }

  return (
    <>
      <primitive object={obj} scale={0.02} />
      
      {['tv', 'groceries', 'utilities'].map((type) => {
        const details = getBillDetails(type as 'tv' | 'groceries' | 'utilities')
        const ref = type === 'tv' ? tvRef : type === 'groceries' ? fridgeRef : bedRef
        
        return (
          <mesh 
            key={type}
            ref={ref as any} 
            onClick={() => setShowExpense(type as 'tv' | 'groceries' | 'utilities')}
          >
            <boxGeometry args={[1, 1, 1]} />
            <meshStandardMaterial 
              color={details.color} 
              opacity={0.5} 
              transparent 
            />
          </mesh>
        )
      })}

      {showExpense && (
        <Html position={[0, 2, 0]}>
          <div className="bg-white p-4 rounded shadow-lg">
            <h3 className="text-lg font-bold mb-2">
              {getBillDetails(showExpense).title}
            </h3>
            <form onSubmit={(e) => {
              e.preventDefault()
              const form = e.currentTarget
              const formData = new FormData(form)
              const amount = Number(formData.get('amount'))
              updateExpense(showExpense, amount)
              setShowExpense(null)
            }}>
              <div className="mb-2">
                <label className="block text-sm font-medium text-gray-700">
                  Current Amount: ${expenses[showExpense]}
                </label>
                <input 
                  type="number" 
                  name="amount" 
                  defaultValue={expenses[showExpense]} 
                  className="mt-1 block w-full border rounded-md shadow-sm p-2"
                />
              </div>
              <div className="flex justify-between">
                <button 
                  type="submit" 
                  className="bg-blue-500 text-white px-4 py-2 rounded"
                >
                  Update
                </button>
                <button 
                  type="button" 
                  onClick={() => setShowExpense(null)}
                  className="bg-gray-500 text-white px-4 py-2 rounded"
                >
                  Cancel
                </button>
              </div>
            </form>
          </div>
        </Html>
      )}
    </>
  )
}

