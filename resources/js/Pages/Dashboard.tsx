import { Button } from '@/components/ui/button';
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { data, Note } from '@/types';
import { Head } from '@inertiajs/react';
import { PlusCircle } from 'lucide-react';

export default function Dashboard({ note }: {
    notes: data, note: Note
}) {
    return (
        <AuthenticatedLayout
            header={
                <h2 className="text-xl font-semibold leading-tight text-gray-800 dark:text-gray-200">
                    Dashboard
                </h2>
            }
        >
            <Head title="Dashboard" />
            <div className="h-full flex flex-col items-center justify-center space-y-4">
                <h2>At the moment you don't have any Notes</h2>
                <Button className='button'>
                    <PlusCircle />
                    Create a note
                </Button>
            </div>
        </AuthenticatedLayout>
    );
}
