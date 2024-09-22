import  { useEffect, useRef, useState } from 'react'
import Button from './button'
import { ChevronLeft, ChevronRight } from 'lucide-react'

type CategoryPillisProps = {
    categories: string[],
    selectedCategory: string,
    onSelect: (category: string) => void
}

const TRANSLATE_X = 200

export default function CategoryPills({ categories, selectedCategory, onSelect }: CategoryPillisProps) {
    const [translate, setTranslate] = useState(0)
    const [isLeftVisible, setIsLeftVisible] = useState(false)
    const [isRightVisible, setIsRightVisible] = useState(true)

    const pillsRef = useRef<HTMLDivElement>(null)

    useEffect(() => {
        if (pillsRef.current === null )return 
        const observer = new ResizeObserver((entries) => {
            const container = entries[0]?.target
            if(container === null) return 
            setIsLeftVisible(translate > 0)
            setIsRightVisible(translate + container.clientWidth < container.scrollWidth)
        })
        observer.observe(pillsRef.current)
        return () => {
            observer.disconnect()
        }
    }, [translate, categories])

    return (
        <div ref={pillsRef}  className='overflow-x-hidden relative'>
            <div 
            className='flex whitespace-nowrap gap-3 transition-transform w-[max-content]'
            style={{transform: `translate(-${translate}px)`}}>
                {
                    categories.map(category => (
                    <Button  
                        variant={selectedCategory === category ? "dark" : "default"}
                        onClick={() => onSelect(category)}
                        key={category} 
                        className='py-1 px-3 rounded-lg whitespace-nowrap'>
                        {category}
                    </Button>
                    ))
                }
            </div>

            {isLeftVisible && <div className='absolute top-1/2 left-0 -translate-y-1/2 bg-gradient-to-r from-white from-50% to-transparent w-24 h-full'>
                <Button variant="ghost" size="icon" 
                className='h-full aspect-square w-auto p-1.5'
                onClick={() => {
                        setTranslate(translate =>{
                            return translate - TRANSLATE_X  <=0 ?  0 : translate - TRANSLATE_X
                        })
                    }}>
                    <ChevronLeft />
                </Button>
            </div>}

            {isRightVisible && <div className='absolute top-1/2 right-0 -translate-y-1/2 bg-gradient-to-l from-white from-50% to-transparent w-24 h-full flex justify-end    '>
                <Button variant="ghost" size="icon" 
                className='h-full aspect-square w-auto p-1.5'
                onClick={() => {
                    setTranslate(translate => {
                        if(pillsRef.current === null) {return translate}
                        const newTranslate = translate + TRANSLATE_X
                        const edge = pillsRef.current.scrollWidth
                        const width = pillsRef.current.clientWidth
                        if(newTranslate + width  >= edge){ return edge - width}
                        return newTranslate
                    })
                    
                }}>
                    <ChevronRight />
                </Button>
            </div>}
        </div>
    )
}
