import React from "react";
import { Link } from "react-router-dom";
import './NotFound.css';

const NotFound = () => {
    return (
        <div className="NotFound">
            <div className="d-flex align-items-center justify-content-center vh-100">
                <div className="text-center">
                    <h1 className="display-1 fw-bold">404</h1>
                    <p className="fs-3"> <span class="text-danger">Opps!</span> Page not found.</p>
                    <p className="lead">
                        The page you’re looking for doesn’t exist.
                    </p>
                    <Link to="/" className="btn GoHome fs-4">Go Home</Link>
                </div>
            </div>
        </div>
    );
}

export default NotFound;

