import ActionsHeader from "./components/actionsHeader"
import Logo from "./components/logo"
import Search from "./components/search"

const Header = () => {
  return (
    <div className="bg-indigo-500 p-6 h-20 flex justify-between items-center">
        <Logo />
        <Search />
        <ActionsHeader />
    </div>
  )
}

export default Header