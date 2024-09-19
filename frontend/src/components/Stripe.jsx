/* const Stripe = ({ price, orderId }) => {
  const [clientSecret, setClientSecret] = useState('')
    const apperance = {
        theme: 'stripe'
    }
    const options = {
        apperance,
        clientSecret
    }

    const create_payment = async () => {
        try {
            const { data } = await axios.post('http://localhost:5000/api/order/create-payment',{price},{withCredentials:true})
            setClientSecret(data.clientSecret)
        } catch (error) {
            console.log(error.response.data)
        }
    }

  return (
    <div>Stripe</div>
  )
}

export default Stripe */