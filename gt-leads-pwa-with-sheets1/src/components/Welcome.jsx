export default function Welcome({ topics, onChoose }) {
  return (
    <div className="grid gap-4 md:gap-6">
      <div className="card">
        <h1 className="text-2xl md:text-3xl font-bold mb-2">Hi there! How can we help you?</h1>
        <p className="text-slate-600">Please choose what best matches your product:</p>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {topics.map(t => (
          <button key={t.id} className="card text-left" onClick={() => onChoose(t)}>
            <div className="text-sm text-slate-500 mb-1">{t.id}</div>
            <div className="text-lg font-semibold">{t.title}</div>
          </button>
        ))}
      </div>
    </div>
  )
}