import React, { useState } from 'react';
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import DataTable from 'react-data-table-component';
import { Eye, X } from 'lucide-react';
import { Link } from '@inertiajs/react';
import Modal from '@/Components/Modal';
import { Gallery } from 'react-grid-gallery';

export default function Index({ auth, contentsByCategory }) {
    const categories = Object.keys(contentsByCategory).map(categoryKey => {
        const category = JSON.parse(categoryKey);
        return {
            id: category.id,
            name: category.name,
            status: category.status ? 'Ativo' : 'Inativo',
            desc: category.desc,
            contents: contentsByCategory[categoryKey]
        };
    });

    const [modalIsOpen, setModalIsOpen] = useState(false);
    const [selectedCategory, setSelectedCategory] = useState(null);

    const openModal = (category) => {
        setSelectedCategory(category);
        setModalIsOpen(true);
    };

    const closeModal = () => {
        setSelectedCategory(null);
        setModalIsOpen(false);
    };

    const customStyles = {
        headRow: {
            style: {
                backgroundColor: '#1F2937',
                color: '#FFFFFF',
                borderBottom: 'none',
            },
        },
        headCells: {
            style: {
                padding: '12px 24px',
                fontWeight: 'bold',
            },
        },
        rows: {
            style: {
                backgroundColor: '#FFFFFF',
                color: '#1F2937',
            },
        },
        pagination: {
            style: {
                borderTop: 'none',
            },
        },
    };
    
    const images = selectedCategory ? selectedCategory.contents.map(content => ({
        src: `/storage/${content.img}`,
        thumbnail: `/storage/${content.img}`,
        width: 320,
        height: 212,
        caption: content.name,
        tags: [
            { value: content.name, title: "data" },
         ],
        
    })) : [];
    console.log(selectedCategory)
    return (
        <AuthenticatedLayout user={auth.user}>
            <header className="bg-white shadow">
                <div className="max-w-7xl mx-auto py-6 px-4 sm:px-6 lg:px-8">
                    <h2 className="font-semibold text-xl text-gray-800 leading-tight">Fotos Eventos</h2>
                </div>
            </header>
            
            <div className="py-12">
                <div className="mx-auto max-w-7xl sm:px-6 lg:px-8">
                    <Link href={route('categories.create')} className="inline-flex items-center my-4 px-4 py-2 bg-indigo-700 border border-transparent rounded-md font-semibold text-xs text-white uppercase tracking-widest hover:bg-indigo-900 focus:bg-indigo-700 active:bg-indigo-900 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 transition ease-in-out duration-150">
                        Enviar Foto
                    </Link>

                    <div className="overflow-hidden bg-white shadow-md sm:rounded-lg">
                        <DataTable
                            columns={[
                                { name: 'Id', selector: row => row.id },
                                { name: 'Nome', selector: row => row.name },
                                { name: 'Descrição', selector: row => row.desc },
                                {
                                    name: 'Visualizar',
                                    cell: row => (
                                        <div>
                                            <Eye onClick={() => openModal(row)} className="my-2 bg-amber-600 border border-transparent rounded-md font-semibold text-xs text-white uppercase tracking-widest hover:bg-amber-900 focus:bg-amber-700 active:bg-amber-900 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 transition ease-in-out duration-150" />
                                        </div>
                                    ),
                                },
                            ]}
                            data={categories}
                            pagination
                            paginationPerPage={10}
                            paginationRowsPerPageOptions={[10]}
                            customStyles={customStyles}
                        />
                    </div>
                </div>
            </div>

            <Modal
                show={modalIsOpen}
                onClose={closeModal}
            >
                 {selectedCategory && (
                    <div className='px-4 py-4 flex justify-between'>
                        <h1 className='font-semibold text-xl '>{selectedCategory.name}</h1>
                        <X onClick={closeModal}/>
                    </div>
                )}
                    <div style={{ maxHeight: '500px', overflowY: 'scroll' }}>
                        <Gallery
                            images={images}
                            enableImageSelection={false}
                        />
                    </div>
               
                
            </Modal>
        </AuthenticatedLayout>
    );
}
