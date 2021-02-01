import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import { Link } from 'react-router-dom';
import CaseUpdate from './CaseUpdate';
import {
  Container,
  CaseSpecs,
  ClientSpecs,
  Results,
  KeyParagraph,
  ValueParagraph,
} from './CaseOverviewStyled';

const CaseOverview = props => {
  const { authState } = props;
  const [caseData, setCaseData] = useState();
  const { id } = useParams();

  useEffect(() => {
    async function fetchCase() {
      axios
        .get(`${process.env.REACT_APP_API_URI}/case/${id}`, {
          headers: {
            Authorization: 'Bearer ' + authState,
          },
        })
        .then(res => {
          console.log(res.data);
          setCaseData(res.data);
        })
        .catch(err => {
          console.log(err);
        });
    }
    fetchCase();
  }, [id, authState]);

  return (
    <Container>
      {caseData && (
        <div>
          <CaseSpecs>
            Case Specifics
            <KeyParagraph>Case ID: {id}</KeyParagraph>
            <KeyParagraph>Case Status: {caseData.case_status}</KeyParagraph>
            <KeyParagraph>Date: {caseData.hearing_date}</KeyParagraph>
            <KeyParagraph>Location: {caseData.hearing_location}</KeyParagraph>
            <KeyParagraph>
              Type of Hearing: {caseData.hearing_type}
            </KeyParagraph>
            <KeyParagraph>
              Judge Name:
              <Link to={`/judge/${caseData.judge_name}`}>
                {' '}
                {caseData.judge_name}
              </Link>
            </KeyParagraph>
            <KeyParagraph>Court Type: {caseData.court_type}</KeyParagraph>
          </CaseSpecs>

          <ClientSpecs>
            Client Specifics
            <ValueParagraph>Origin: {caseData.refugee_origin}</ValueParagraph>
            <ValueParagraph>
              Social Group: {caseData.social_group_type}{' '}
            </ValueParagraph>
            <ValueParagraph>
              Protected Grounds: {caseData.protected_ground}
            </ValueParagraph>
            <ValueParagraph>
              Credibility: {caseData.credibility_of_refugee}{' '}
            </ValueParagraph>
          </ClientSpecs>

          <Results>
            Results
            <KeyParagraph>Decision Date: {caseData.decision_date}</KeyParagraph>
            <KeyParagraph>
              Judge Decision: {caseData.judge_decision}
            </KeyParagraph>
          </Results>
          <Link to={`/case/${id}/update`}>Update this Case</Link>
        </div>
      )}
    </Container>
  );
};

export default CaseOverview;
