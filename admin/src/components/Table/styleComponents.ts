import styled from 'styled-components';

import { colors } from 'theme';

export const TableWrapper = styled.div`
  border: 1px solid ${colors.lighterGray};
  border-radius: 4px;

  .table {
    border-collapse: collapse;
    overflow: auto;

    .thead {
      .tr {
        border-bottom: 1px solid ${colors.lighterGray};

        .th {
          position: relative;
          text-align: left;
          padding: 0.5rem 0.35rem;
          border-right: 1px solid ${colors.lighterGray};
          font-size: 0.9rem;
          color: ${colors.darkGray};
          font-weight: 700;
          display: flex;
          align-items: center;
          justify-content: space-between;

          &:last-child {
            border-right: none;

            .resizer {
              width: 5px;
              transform: none;
            }
          }
          &.filter {
            padding: 0.25rem;
          }

          .resizer {
            display: inline-block;
            width: 10px;
            height: 100%;
            position: absolute;
            right: 0;
            top: 0;
            transform: translateX(50%);
            z-index: 1;
            touch-action: none;
          }
        }
      }
    }
    .tbody {
      .tr {
        border-bottom: 1px solid ${colors.lighterGray};

        &.pressable {
          cursor: pointer;
          transition: 0.1s background-color ease-in;

          &:hover {
            background-color: #f1f1f1;
          }
        }
        &:last-child {
          border-bottom: none;
        }
        &:nth-child(2n) {
          background-color: #f7f7f7;
        }

        .td {
          border-right: 1px solid ${colors.lighterGray};
          padding: 0.5rem 0.35rem;
          text-overflow: ellipsis;
          white-space: nowrap;
          overflow: hidden;
          font-size: 1rem;

          &:last-child {
            border-right: none;
          }
        }
      }
    }
  }
  .pagination {
    padding: 0.25rem 0.25rem;
    border-top: 1px solid ${colors.lighterGray};
    text-align: center;
    display: flex;
    justify-content: center;
    align-items: center;

    button {
      flex: 1;
      padding: 0 0.5rem;
      border: none;
      border-radius: 3px;
      margin-left: 0.15rem;
      margin-right: 0.15rem;
      background-color: ${colors.lightGray};
      cursor: pointer;
      font-size: 1rem;
      height: 2rem;

      &:first-child {
        margin-left: 0px;
      }
      &:last-child {
        margin-right: 0px;
      }
      &:hover {
        background-color: ${colors.gray};
      }
      &:disabled {
        background-color: ${colors.lighterGray};
      }
    }
    span {
      display: inline-block;
      margin-left: 0.5rem;
      font-size: 1rem;
    }
    select {
      padding: 0 0.35rem;
      border: 1px solid ${colors.lightGray};
      border-radius: 3px;
      margin-left: 0.5rem;
      margin-right: 0.5rem;
      font-size: 1rem;
      height: 2rem;
    }
  }
`;
