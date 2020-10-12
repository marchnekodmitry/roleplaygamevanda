import React from 'react';
import styled from 'styled-components';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';

import { useInput } from '../utils/hooks';
import vars from '../utils/style/vars';

const getStatModifier = (stat) => {
  return Math.ceil((stat - 10) / 2);
};

const columns = [
  {
    title: 'Armor class',
    color: vars.palette.blue_grey,
    data: ({ dex }) => {
      return 10 + getStatModifier(dex);
    },
  },
  {
    title: 'Attack modifier',
    color: vars.palette.pink,
    data: ({ dex, weaponAbility }) => {
      return getStatModifier(dex) + weaponAbility;
    },
  },
  {
    title: 'Strength',
    color: vars.palette.red,
    data: ({ str }) => getStatModifier(str),
  },
  {
    title: 'Cast modifier',
    color: vars.palette.blue,
    data: ({ magicAbility, int }) => {
      return getStatModifier(int) + magicAbility;
    },
  },
  {
    title: 'Health',
    color: vars.palette.green,
    data: ({ end }) => {
      return 5 * end;
    },
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
  const [fromStat, setFromStat] = useInput(7);
  const [toStat, setToStat] = useInput(15);
  const [fromAbility, setFromAbility] = useInput(0);
  const [toAbility, setToAbility] = useInput(3);

  const generateStatsHandler = React.useCallback(
    (e) => {
      e.preventDefault();

      const newStats = [];

      for (let i = 0; i < count; i++) {
        newStats.push({
          int: generateRandomFromRange(fromStat, toStat),
          str: generateRandomFromRange(fromStat, toStat),
          end: generateRandomFromRange(fromStat, toStat),
          dex: generateRandomFromRange(fromStat, toStat),
          weaponAbility: generateRandomFromRange(fromAbility, toAbility),
          magicAbility: generateRandomFromRange(fromAbility, toAbility),
        });
      }

      setStats(newStats);
    },
    [count, fromStat, toStat, fromAbility, toAbility]
  );

  return (
    <Wrapper>
      <StyledForm onSubmit={generateStatsHandler}>
        <CountInput label="Count" type="number" onChange={setCount} />
        <FromInput
          label="From (main stat)"
          type="number"
          onChange={setFromStat}
          value={fromStat}
        />
        <ToInput
          label="To (main stat)"
          type="number"
          onChange={setToStat}
          value={toStat}
        />
        <FromInput
          label="From (ability)"
          type="number"
          onChange={setFromAbility}
          value={fromAbility}
        />
        <ToInput
          label="To (ability)"
          type="number"
          onChange={setToAbility}
          value={toAbility}
        />
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
  width: 150px;
  font-weight: bold;
  background-color: ${({ color }) => color};
  color: ${vars.palette.white};
`;

const StyledTableCell = styled(TableCell)`
  width: 150px;
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
