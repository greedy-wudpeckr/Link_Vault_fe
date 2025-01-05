export function Input({ refe, placeholder }: { refe ?: any; placeholder: string }) {
    return (
        <div>
            <input placeholder={placeholder} type="text" ref={refe} className="px-4 py-2 border rounded m-2" />
        </div>
    );
}