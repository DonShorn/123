export default function FormScreen({ topic, form, setForm, onSubmit, onBack }) {
  const change = (e) => setForm({ ...form, [e.target.name]: e.target.value })
  return (
    <div className="grid gap-4 md:gap-6">
      <div className="card">
        <div className="flex items-center justify-between">
          <div>
            <div className="text-sm text-slate-500 mb-1">{topic.id}</div>
            <h2 className="text-xl md:text-2xl font-bold">{topic.title}</h2>
          </div>
          <button className="btn-ghost" onClick={onBack}>Back</button>
        </div>
        <pre className="whitespace-pre-wrap text-slate-700 mt-4">{topic.blurb}</pre>
      </div>
      <div className="card">
        <div className="grid gap-4">
          <div>
            <label className="label">Name</label>
            <input className="input" name="name" value={form.name} onChange={change} placeholder="Your name" />
          </div>
          <div>
            <label className="label">Company</label>
            <input className="input" name="company" value={form.company} onChange={change} placeholder="Your company" />
          </div>
          <div>
            <label className="label">Telegram / Email</label>
            <input className="input" name="contact" value={form.contact} onChange={change} placeholder="@username or email@example.com" />
          </div>
          <div>
            <label className="label">Briefly: what your company does</label>
            <textarea className="input h-28" name="description" value={form.description} onChange={change} placeholder="One or two sentences" />
          </div>
          <button className="btn w-full md:w-auto" onClick={onSubmit}>Submit & get PDF</button>
        </div>
      </div>
    </div>
  )
}