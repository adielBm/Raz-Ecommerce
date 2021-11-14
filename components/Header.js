import Link from "next/link"
const Header = () => {
  return (
    <header>
      <Link href={`/`} >
        <a>
          <h1>Raz ecommerce</h1>
        </a>
      </Link>
    </header>
  )
}

export default Header