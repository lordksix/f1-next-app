export default function getFormattedDate(dateString: string): string {
    return new Intl.DateTimeFormat('en-US', { dateStyle: 'long', timeStyle: 'long', }).format(new Date(dateString))
}