const Header = () => {
  return (
    <header className="flex w-full">
      <nav>
        <ul className="flex flex-row gap-10">
          <li>
            <h2>
              NM.
            </h2>
          </li>
          <ul className="flex flex-row pl-10 gap-2">
          <li>WORKS.</li>
          <li>CONTACT.</li>
          <li>ABOUT.</li>
          </ul>
        </ul>
      </nav>
    </header>
  )
}

export default Header