

export const register_user = async (formData) => {
    try {
        const res = await fetch('http://localhost:3000/api/Auth/register', {
            headers: {
                'Content-Type': 'application/json',
            },
            method: 'POST',
            body: JSON.stringify(formData),
        });
        const data = await res.json();
        return data;
    } catch (error) {
        console.log('Error in register_user (service) => ', error);
        return error.message
    }
};
export const regmiles = async (val, miles) => {
    try {
        const res = await fetch('http://localhost:3000/api/Auth/milestonepost', {
            headers: {
                'Content-Type': 'application/json',
            },
            method: 'POST',
            body: JSON.stringify({
                bid: val,
                milestones: miles,
            }),
        });
        const data = await res.json();
        return data;
    } catch (error) {
        console.log('Error in register_user (service) => ', error);
        return error.message;
    }
};

export const getmiles = async (val) => {
    try {
        const res = await fetch(`http://localhost:3000/api/Auth/getmilestones`, {
            method: 'GET',
        });
        const data = await res.json();
        return data;
    } catch (error) {
        console.log('Error in getMiles (service) => ', error);
        return error.message;
    }
};


export const login_user = async (formData) => {
    try {
        const res = await fetch('http://localhost:3000/api/Auth/login', {
            headers: {
                'Content-Type': 'application/json',
            },
            method: 'POST',
            body: JSON.stringify(formData),
        });
        const data = await res.json();
        return data;
    } catch (error) {
        console.log('Error in login_user (service) => ', error);
        return error.message
    }
};