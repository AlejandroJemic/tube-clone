import { ArrowLeft, Bell, CircleUserRound, Menu, Mic, Search, Video, Youtube } from "lucide-react";
import Button from "../components/button";
import { useState } from "react";

export default function PageHeader() {
  const [showFullWidthSearch, setshowFullWidthSearch] = useState(false)

  return (
    <header className="p-1 flex gap-10 lg:gap-20 justify-between flex-row mb-6 mx-2">
      {/* logo */}
      <div className={`${showFullWidthSearch ? "hidden" : "flex items-center flex-shrink-0 flex-row justify-center"}`} >
        <Button variant='ghost' size='icon'>
          <Menu />
        </Button>
        <a href="/" className="text-2xl m-0 inline-flex gap-1 items-center p-2 justify-center">
          <Youtube className="w-9 h-9" />
          <span className="pb-0.5">TubeClone</span>
        </a>
      </div>
      {/* search */}
      <form  className={`md:flex gap-4  flex-row flex-grow justify-center ${showFullWidthSearch ? "flex" : " hidden"}`} >
        {showFullWidthSearch && <Button  type='button'  variant='ghost' size='icon' 
          onClick={() => setshowFullWidthSearch(false)}
          className="flex flex-shrink-0 mt-1">
          <ArrowLeft />
        </Button>}
        <div className="flex items-center max-w-[600px] flex-grow">  
          <input type="search" placeholder="Search" 
            className="w-full py-1 px-4 text-lg rounded-l-full 
            border border-secondary-border 
            shadow-inner shadow-secondary
            focus:border-blue-700 outline-none"
          />
          <Button className="py-1.5 px-4 rounded-r-full border border-l-0 flex-shrink-0 border-secondary-border" >
            <Search className="w-6 h-6"/>
          </Button>
        </div>
        <Button  type='button' size='icon' className="flex-shrink-0 mt-1">
          <Mic />
        </Button>
      </form>
      {/* icons */}
      <div  className={`items-center flex-shrink-0 flex-row justify-center ${showFullWidthSearch ? "hidden" : "flex" }`} >
        <Button onClick={() => setshowFullWidthSearch(true)} variant='ghost' size='icon'  className="md:hidden">
          <Search  className="w-6 h-6" />
        </Button>
        <Button variant='ghost' size='icon' className="md:hidden">
          <Mic  className="w-6 h-6"/>
        </Button>
        <Button variant='ghost' size='icon' >
          <Video />
        </Button>
        <Button variant='ghost' size='icon' >
          <Bell />
        </Button>
        <Button variant='ghost' size='icon' >
        <CircleUserRound />
        </Button>
      </div>

    </header>
  )
}
