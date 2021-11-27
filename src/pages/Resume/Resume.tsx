import { useState } from 'react';
import { pdfjs } from 'react-pdf';
import { Document, Page } from 'react-pdf/dist/esm/entry.webpack';
import { BrowserView, MobileView } from 'react-device-detect';
import React from 'react';

pdfjs.GlobalWorkerOptions.workerSrc = 'pdf.worker.min.js';

interface PageSelectorProps {
    totalPages: number;
    currentPage: number;
    setCurrentPage: (next: number) => any;
}

const PageSelector = (props: PageSelectorProps) => {
    return (
        <div className="has-text-centered">
            <p>Page {props?.currentPage} of {props?.totalPages}</p>
            {
                props?.currentPage > 1 ? (
                    <div style={{margin: '5px'}}>
                        {
                            props?.currentPage < props?.totalPages ? (
                                <div>
                                    <button 
                                        className="button is-outlined is-danger pdf-btn" 
                                        onClick={() => props?.setCurrentPage(props?.currentPage - 1)}
                                    >Back</button>
                                    <button 
                                        className="button is-outlined is-link pdf-btn" 
                                        onClick={() => props?.setCurrentPage(props?.currentPage + 1)}
                                    >Next</button>    
                                </div>
                            ) : (
                                <button 
                                    className="button is-outlined is-danger pdf-btn" 
                                    onClick={() => props?.setCurrentPage(props?.currentPage - 1)}
                                >Back</button>
                            )
                        }
                    </div>
                ) : (
                    <button 
                        className="button is-outlined is-link pdf-btn" 
                        onClick={() => props?.setCurrentPage(props?.currentPage + 1)}
                    >Next</button>
                )
            }
        </div>
    )
};

const Resume = () => {
    const [numPages, setNumPages] = useState<number>(0);
    const [currentPage, setCurrentPage] = useState<number>(1);
    const [showingResumeModal, setShowingResumeModal] = useState<boolean>(false);
    
    const resumeLoaded = ({numPages}: any) => {
        setNumPages(numPages as number);
    }

    const resumeNotLoaded = () => {
        console.error('unable to render pdf!');
        showResumeModal();
    };

    const showResumeModal = () => {
        setShowingResumeModal(true);
    }

    const closeResumeModal = () => {
        setShowingResumeModal(false);
    }

    return (
        <div className="has-text-centered">
            <p onClick={showResumeModal} style={{marginBottom: '20px', marginTop: '-10px', cursor: 'pointer'}}>Click here if PDF is not showing</p>
            <div className="modal-container">
                <div className={showingResumeModal ? "modal modal-fx-fadeInScale is-active" : "modal modal-fx-fadeInScale"}>
                    <div className="modal-background"></div>
                    <div className="modal-content is-huge pdf-content">
                        <object data="assets/resume.pdf" type="application/pdf" width="100%" height="100%" className="pdf-object">
                            <p>Unable to render pdf!</p>
                        </object>
                    </div>
                    <button onClick={closeResumeModal} className="modal-close is-large" aria-label="close"></button>
                </div>
            </div>

            <BrowserView>
                <PageSelector 
                    totalPages={numPages}
                    currentPage={currentPage}
                    setCurrentPage={setCurrentPage}
                />

                <Document
                    file="assets/resume.pdf"
                    onLoadSuccess={resumeLoaded}
                    onLoadError={resumeNotLoaded}
                    options={{
                        cMapUrl: 'cmaps/',
                        cMapPacked: true,
                    }}
                >
                    <Page 
                        renderTextLayer={true}
                        renderAnnotationLayer={true}
                        pageNumber={currentPage}
                        scale={2.3}
                    />
                </Document>
            </BrowserView>

            <MobileView>
                <section className="hero is-medium is-link">
                    <div className="hero-body">
                        <p className="title">Mobile user</p>
                        <p className="subtitle">Please use the button below to view my resume.</p>
                        <button onClick={() => {
                            window.open('assets/resume.pdf', '_blank');
                        }} className="button is-outline">Resume</button>
                    </div>
                </section>
            </MobileView>
        </div>
    );
};

export default Resume;
