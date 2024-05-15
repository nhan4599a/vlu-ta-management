import React, { useState } from 'react';
import { Button } from 'react-bootstrap';

const AttendanceLink = () => {
    const [attendanceLink, setAttendanceLink] = useState<string>();
    return (
        <Button variant="link" target="_blank"
        value={attendanceLink} onChange={(e) => setAttendanceLink(e.target.value)}>
            Xem link điểm danh
        </Button>
    );
};

export default AttendanceLink;