export function saveData(list)
 {
    localStorage.removeItem('dogList');
    localStorage.setItem('dogList',JSON.stringify(list))
    
 }

