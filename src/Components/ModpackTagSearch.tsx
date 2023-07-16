import axios from 'axios';
import { useEffect, useState } from 'react';



function ModpackTagSearch() {
    const [loading, setLoading] = useState(false);
    const [debounceTimer, setDebounceTimer] = useState();
    const [username, setUsername] = useState('');
    const [exists, setExists] = useState(false);


    // handle the setUsername to add the previos value to the new value
    const handleSetUsername = (e:any) => {
        setUsername(e.target.value);
    };




    return (
        <form className='z-20'>
            <input 
                className={` h-8 rounded-md border-2 text-sm  px-3 py-1 `}
                placeholder='Search by tags'
                type="text" value={username}  onChange={handleSetUsername} />
            
           
        </form>
    );
}
export default ModpackTagSearch;