export default function Footer() {
  return (
    <footer role="contentinfo">
      <div className="container">
        <p>&copy; {new Date().getFullYear()} Handcrafted Haven</p>
        <p>
          <a href="/accessibility">Accessibility</a> • <a href="/about">About</a>
        </p>
      </div>
    </footer>
  )
}
