import React from 'react'
import Container from '../Container'
import { TbBeach } from 'react-icons/tb';
import { GiWindmill } from 'react-icons/gi';
import { MdOutlineVilla } from 'react-icons/md';
import CategoryBox from './CategoryBox';
import { usePathname, useSearchParams } from 'next/navigation';

export const categories = [
    {
        id: 1,
        label: 'Beach',
        Icon: TbBeach,
        description: "This property is close to the beach",
    },
    {
        id: 2,
        label: 'Windmills',
        Icon: GiWindmill,
        description: "This property has windmills",
    },
    {
        id: 3,
        label: 'Modern',
        Icon: MdOutlineVilla,
        description: "This property is modern",
    },

]



const Categories = () => {
    const params = useSearchParams();

    const category = params?.get('category');

    const pathname = usePathname();

    const isMainPage = pathname === '/';

    if (!isMainPage) {
        return null;
    }
    

    return (
        <Container>
            <div 
                className='pt-4 flex flex-row items-center justify-between overflow-x-auto '
            >
                {categories.map(item => (
                    <CategoryBox
                        key={item.id}
                        label={item.label}
                        Icon={item.Icon}
                        description={item.description}
                        selected={category === item.label}
                    />
                ))}
            </div>
        </Container>
        
    )
}

export default Categories;