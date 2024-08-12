// Alert.js
import React from 'react';

function Alert({ type, message }) {
    return (
        <div className={`alert ${type === 'success' ? 'alert-success' : 'alert-error'} mb-4`}>
            <div className="flex-1">
                <label className="sr-only">{type === 'success' ? 'Success' : 'Error'}</label>
                {message}
            </div>
        </div>
    );
}

export default Alert;
