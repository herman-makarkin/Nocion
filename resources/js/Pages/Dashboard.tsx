import Toolbar from '@/Components/Toolbar';
import { Button } from '@/components/ui/button';
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { data, Note } from '@/types';
import { Head, usePage } from '@inertiajs/react';
import { PlusCircle } from 'lucide-react';
import { useNote } from '@/Hooks/note';
import Cover from '@/Components/Cover';
import { Skeleton } from '@/components/ui/skeleton';
import Editor from '@/Components/Editor';

export default function Dashboard({ note }: {
    notes: data, note: Note
}) {

    if (!!note) {
        useNote().note = usePage().props.note.data;
    }

    // if (note === undefined) {
    //     console.log();
    //     return (
    //         <div>
    //             <Cover.Skeleton />
    //             <div className="md:max-w-3xl mx-auto mt-10 lg:max-w-4xl">
    //                 <div className="space-y-4 pl-8 pt-4">
    //                     <Skeleton className='h-14 w-[50%]' />
    //                     <Skeleton className='h-4 w-[80%]' />
    //                     <Skeleton className='h-4 w-[80%]' />
    //                     <Skeleton className='h-4 w-[80%]' />
    //                     <Skeleton className='h-4 w-[80%]' />
    //                 </div>
    //             </div>
    //         </div>
    //     )
    // }

    return (
        <AuthenticatedLayout
            header={
                <h2 className="text-xl font-semibold leading-tight text-gray-800 dark:text-gray-200">
                    Dashboard
                </h2>
            }
        >
            <Head title="Dashboard" />
            {!!note ? (
                <div className='pb-40'>
                    <Cover />
                    <div className='md:max-w-3xl lg:max-w-4xl mx-auto'>
                        <Toolbar />
                        <Editor></Editor>
                    </div>
                </div>
            ) : (
                <div className="h-full flex flex-col items-center justify-center space-y-4">
                    <h2>At the moment you don't have any Notes</h2>
                    <Button className='button'>
                        <PlusCircle />
                        Create a note
                    </Button>
                </div>
            )}
        </AuthenticatedLayout>
    );
}
