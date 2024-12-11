import Toolbar from '@/Components/Toolbar';
import { Button } from '@/components/ui/button';
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { data, Note } from '@/types';
import { Head, useForm, usePage } from '@inertiajs/react';
import { PlusCircle } from 'lucide-react';
import { useNote } from '@/Hooks/note';
import Cover from '@/Components/Cover';
import { Skeleton } from '@/components/ui/skeleton';
import Editor from '@/Components/Editor';

export default function Dashboard({ note }: {
    notes: data, note: Note
}) {
    console.log(usePage().props.notes);

    const { data, setData, post, errors } = useForm({
        title: 'Untitled',
    })

    const onSubmit = () => {
        post(route('dashboard.store'));
    }


    if (!!note) {
        useNote().note = usePage().props.note.data;
    }

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
                    <h2>Welcome to Nocion</h2>
                    <Button className='button' onClick={onSubmit}>
                        <PlusCircle />
                        Create a note
                    </Button>
                </div>
            )}
        </AuthenticatedLayout>
    );
}
