import { Document, Page, pdfjs } from 'react-pdf';
import { useState } from 'react';

export default function BookDisplayer(props)
{
    const {bookToDisplay} = props
    const [numPages, setNumPages] = useState(null);
    const [loading, setLoading] = useState(false);

    const onDocumentLoadSuccess = ({ numPages }) => {
        setNumPages(numPages);
    };

    return <Document file={bookToDisplay} onLoadSuccess={onDocumentLoadSuccess}>
    {Array.from(new Array(numPages), (el, index) => (
        <Page key={`page_${index + 1}`} pageNumber={index + 1} />
    ))}
</Document>
}



