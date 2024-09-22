import { useState } from 'react'
import './App.css'
import './index.css'
import PageHeader from './layout/page-header'
import CategoryPills from './components/categoryPills'
import { categories, videos } from './data/home'
import VideoGridItem from './components/VideoGridItem'
import {Sidebar} from './layout/sidebar'
import { SidebarProvider } from './contexts/SidebarContext'

 function App() {
  const [selectedCategory, setSelectedCategory] = useState(categories[0])

  return (
    <SidebarProvider>
    <div className='max-h-screen flex flex-col'>
      <PageHeader></PageHeader>
      <main className='grid grid-cols-[auto,1fr] flex-grow-1 overflow-auto'>
        <Sidebar />

        <div className='overflow-x-hidden px-8 pb-2'>
          <div className='sticky top-0 bg-white z-10 pb-4'>
            <CategoryPills
              categories={categories}
              selectedCategory={selectedCategory}
              onSelect={setSelectedCategory}
            />
          </div>

          <div className='grid gap-4 grid-cols-[repeat(auto-fill,minmax(300px,1fr))]'>

            {
              videos.map((video) => (
                <VideoGridItem
                  key={video.id}
                  id={video.id}
                  title={video.title}
                  channel={video.channel}
                  views={video.views}
                  postedAt={video.postedAt}
                  duration={video.duration}
                  thumbnailUrl={video.thumbnailUrl}
                  videoUrl={video.videoUrl}
                />
              ))
            }
          </div>
        </div>

      </main>
    </div>
    </SidebarProvider>
  )
}
export default App