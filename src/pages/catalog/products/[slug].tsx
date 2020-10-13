import {useRouter} from 'next/router'
import { useState } from 'react'
import dynamic from 'next/dynamic'

// ssr: false - vai ser informado que o componente vaai ser carregado pelo bronser e não pelo node
const AddToCartModal = dynamic(
  () => import('../../../components/AddToCartModal'),
  {loading: () => <p>carregando</p>, ssr: false}
)

export default function Product() {
  const router = useRouter()
  const [isAddToCartModalVisible, setIsAddToCartModalVisible] = useState(false)

  function handleAddToCart() {
    setIsAddToCartModalVisible(true)
  }

  return (
    <div>
      <h1>{router.query.slug}</h1>

      <button onClick={handleAddToCart}>Add to cart</button>

      {isAddToCartModalVisible && <AddToCartModal />}
    </div>
  )
}