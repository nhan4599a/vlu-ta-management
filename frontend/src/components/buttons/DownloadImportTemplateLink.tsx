import React from 'react';
import '../../index.css'

const DownloadImportTemplateLink = () => {
    const filename = "/Template_DanhSachHocPhan.xlsx"
    return (
        <p><a className="link-opacity-100" href={filename} download={filename.slice(1)}>Template_DanhSachHocPhan.xlsx</a></p>
    );
};

export default DownloadImportTemplateLink;