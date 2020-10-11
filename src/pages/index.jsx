import React from 'react';
import styled from 'styled-components';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';

import { useInput } from '../utils/hooks';
import vars from '../utils/style/vars';

const columns = [
  {
    title: 'Strength',
    color: vars.palette.red,
    data: ({ str }) => str,
  },
  {
    title: 'Intelligence',
    color: vars.palette.blue,
    data: ({ int }) => int,
  },
  {
    title: 'Dexterity',
    color: vars.palette.green,
    data: ({ dex }) => dex,
  },
  {
    title: 'Stamina',
    color: vars.palette.yellow,
    data: ({ sta }) => sta,
  },
];

const generateRandomFromRange = (min, max) => {
  const minInt = parseFloat(min);
  const maxInt = parseFloat(max);

  return Math.round(Math.random() * (maxInt - minInt) + minInt);
};

const IndexPage = () => {
  const [stats, setStats] = React.useState();

  const [count, setCount] = useInput();
  const [from, setFrom] = useInput();
  const [to, setTo] = useInput();

  const generateStatsHandler = React.useCallback(
    (e) => {
      e.preventDefault();

      const newStats = [];

      for (let i = 0; i < count; i++) {
        newStats.push({
          str: generateRandomFromRange(from, to),
          int: generateRandomFromRange(from, to),
          dex: generateRandomFromRange(from, to),
          sta: generateRandomFromRange(from, to),
        });
      }

      setStats(newStats);
    },
    [count, from, to]
  );

  return (
    <Wrapper>
      <StyledForm onSubmit={generateStatsHandler}>
        <CountInput label="Count" type="number" onChange={setCount} />
        <FromInput label="From" type="number" onChange={setFrom} />
        <ToInput label="To" type="number" onChange={setTo} />
        <GenereateButton
          onClick={generateStatsHandler}
          variant="outlined"
          color="primary"
          type="submit"
        >
          Generate
        </GenereateButton>
      </StyledForm>
      {stats && (
        <Table>
          <TableHead>
            <TableRow>
              {columns.map(({ title, color }) => (
                <HeadTableCell key={title} color={color}>
                  {title}
                </HeadTableCell>
              ))}
            </TableRow>
          </TableHead>
          <TableBody>
            {stats.map((item, idx) => (
              <StyledTableRow key={idx}>
                {columns.map(({ title, data }) => (
                  <StyledTableCell key={title}>{data(item)}</StyledTableCell>
                ))}
              </StyledTableRow>
            ))}
          </TableBody>
        </Table>
      )}
    </Wrapper>
  );
};

const Wrapper = styled.div`
  max-width: 1280px;
  margin: 0 auto;
  padding: 10px;
`;

const StyledTableRow = styled(TableRow)`
  &:nth-child(2n) {
    background-color: ${vars.palette.light_grey};
  }
`;

const HeadTableCell = styled(TableCell)`
  font-weight: bold;
  background-color: ${({ color }) => color};
  color: ${vars.palette.white};
`;

const StyledTableCell = styled(TableCell)`
  font-size: 16px;
`;

const CountInput = styled(TextField)`
  grid-column: 1 / 3;
`;

const FromInput = styled(TextField)`
  grid-column: 1 / 2;
`;

const ToInput = styled(TextField)`
  grid-column: 2 / 3;
`;

const GenereateButton = styled(Button)`
  grid-column: 1 / 3;
`;

const StyledForm = styled.form`
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  grid-gap: 10px;
  max-width: 500px;
  margin: 0 auto 20px auto;
`;

export default IndexPage;
