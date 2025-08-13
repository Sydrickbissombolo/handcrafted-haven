export default function Stars({ value }: { value: number }) {
  const full = Math.round(value)
  return <span aria-hidden="true">{'★'.repeat(full)}{'☆'.repeat(5-full)}</span>
}
