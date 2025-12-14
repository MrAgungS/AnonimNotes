import { ZapIcon } from "lucide-react";

export default function RateLimitUI() {
    return(
        <div className="mt-20">
            <div className="card bg-primary text-primary-content w-96 mx-auto">
                <div className="card-body">
                <ZapIcon></ZapIcon>
                    <h2 className="card-title">Rate Limit</h2>
                    <p>You are making requests too quickly. Please slow down and try again in a moment.</p>
                </div>
            </div>
        </div>
    )
}