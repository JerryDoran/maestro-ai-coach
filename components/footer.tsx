export default function Footer() {
  return (
    <footer className='bg-muted/50 py-12 '>
      <div className='container mx-auto'>
        <p className='text-center'>
          &copy; {new Date().getFullYear()} The Web Architech
        </p>
      </div>
    </footer>
  );
}
