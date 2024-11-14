import Footer from '@/Components/Footer'
import Navbar from '@/Components/Navbar'
import React, { PropsWithChildren } from 'react'

const Layout = ({ children }: PropsWithChildren) => {
    return (
        <div className="h-full">
            <Navbar />
            <main className="h-full pt-20">
                {children}
            </main>
            <Footer />
        </div>
    )
}

export default Layout
