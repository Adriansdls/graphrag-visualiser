import React from "react";
import { Card, CardContent, Typography, Grid } from "@mui/material";
import { CommunityReport } from "../models/community-report";

interface CommunityReportCardsProps {
  communityReports: CommunityReport[];
}

const CommunityReportCards: React.FC<CommunityReportCardsProps> = ({ communityReports }) => {
  return (
    <Grid container spacing={2}>
      {communityReports.map((report) => (
        <Grid item xs={12} sm={6} md={4} key={report.id}>
          <Card>
            <CardContent>
              <Typography variant="h5" component="div">
                {report.title}
              </Typography>
              <Typography variant="body2" color="text.secondary">
                {report.full_content}
              </Typography>
            </CardContent>
          </Card>
        </Grid>
      ))}
    </Grid>
  );
};

export default CommunityReportCards;