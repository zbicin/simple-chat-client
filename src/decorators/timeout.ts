export function timeout(delay: number = 0): any {
    return (target: any, propertyKey: string, descriptor: PropertyDescriptor) => {
        let originalMethod = descriptor.value;
        descriptor.value = (...args) => {
            setTimeout(() => {
                originalMethod.apply(this, args);
            }, delay);
        }
    }
}