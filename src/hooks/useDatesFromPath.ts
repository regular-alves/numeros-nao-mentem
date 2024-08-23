'use client';
import { usePathname } from "next/navigation";

export function getDatesFrom(pathname: string) {
    const dates = (pathname?.match(/(\/\d+\-\d+)/g) || [])
        .map((date: string) => {
            const pieces = date.substring(1).split(/\D/g);

            if (pieces.length !== 2) {
                return null;
            }

            return new Date(
                Number.parseInt(pieces[0]),
                Number.parseInt(pieces[1]) - 1
            )
        })
        .filter(v => v) as unknown as Date[];

    if (!dates.length) {
        const today = new Date();
        
        return {
            from: new Date(today.setMonth(today.getMonth() - 6)),
            to: new Date(),
        };
    }
    
    if (dates.length === 1) {
        return { from: dates[0], to: new Date() };
    }
    
    const sortedDate = dates.sort((a: Date, b: Date) => a.getTime() - b.getTime());
    
    return {
        from: sortedDate.shift() as unknown as Date,
        to: sortedDate.pop() as unknown as Date
    };
}

export default function useDatesFromPath(): { from: Date, to: Date } {
    const pathname = usePathname();
    
    return getDatesFrom(pathname);
}