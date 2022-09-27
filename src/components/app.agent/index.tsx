import {Agent} from '@aries-framework/core';
import {AgentContext, agent} from '@utils';
import React, {createContext, PropsWithChildren, useState} from 'react';

export const AppAgent: React.FC<PropsWithChildren> = ({children}) => {
  return (
    <AgentContext.Provider value={agent}>{children}</AgentContext.Provider>
  );
};
