export default function ThankYou({ onBack }) {
  return (
    <div className="card text-center">
      <h2 className="text-2xl font-bold mb-2">Thank you!</h2>
      <p className="text-slate-700">
        The link to the material has been sent – please check your Telegram or email.
        Our manager will contact you shortly to discuss details and answer any questions.
      </p>
      <button className="btn mt-6" onClick={onBack}>Back to Start</button>
    </div>
  )
}