function debounce(delay: number): any {
    let timeoutHandle: number | null = null;
    return (target: any, propertyKey: string, descriptor: PropertyDescriptor) => {
        let originalMethod = descriptor.value;
        descriptor.value = (...args) => {
            if (timeoutHandle !== null) {
                clearTimeout(timeoutHandle);
            }

            timeoutHandle = setTimeout(() => {
                originalMethod.apply(this, args);
                timeoutHandle = null;
            }, delay);
        }
    };
}