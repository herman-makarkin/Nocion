import Heading from '@/Components/Heading';
import Navbar from '@/Components/Navbar';
import { PageProps } from '@/types';
import { Head, Link } from '@inertiajs/react';
import Layout from '@/Layouts/Layout'

export default function Welcome({
    auth,
    laravelVersion,
    phpVersion,
}: PageProps<{ laravelVersion: string; phpVersion: string }>) {
    return (
        <Layout>
            <div className="min-h-full flex">
                <div className="flex flex-col items-center justify-center text-center md:justify-center gap-y-8 flex-1 px-6 pb-10">
                    <Heading />
                </div>
            </div>
        </Layout>
    )
}
